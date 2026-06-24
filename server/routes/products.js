const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const category = req.query.category;

    const cursorCreatedAt = req.query.cursorCreatedAt
      ? new Date(req.query.cursorCreatedAt)
      : null;

    const cursorId = req.query.cursorId
      ? Number(req.query.cursorId)
      : null;

    const where = {};

    if (category) {
      where.category = category;
    }

    if (cursorCreatedAt && cursorId) {
      where.OR = [
        {
          createdAt: {
            lt: cursorCreatedAt,
          },
        },
        {
          AND: [
            {
              createdAt: {
                equals: cursorCreatedAt,
              },
            },
            {
              id: {
                lt: cursorId,
              },
            },
          ],
        },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          id: "desc",
        },
      ],
      take: limit,
    });

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        cursorCreatedAt: last.createdAt.toISOString(),
        cursorId: last.id,
      };
    }

    res.json({
      products,
      nextCursor,
      hasMore: products.length === limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;