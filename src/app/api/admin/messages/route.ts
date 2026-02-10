import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/core/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const isRead = searchParams.get('isRead');

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (isRead !== null) where.isRead = isRead === 'true';

    const messages = await prisma.message.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
