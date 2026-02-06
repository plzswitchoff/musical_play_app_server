import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './entity/transfer.entity';
import { Repository } from 'typeorm';
import { TransferBookmark } from './entity/transfer-bookmark.entity';
import { TransferMute } from './entity/transfer-mute.entity';
import { TransferRequest } from './entity/transfer-request.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(TransferBookmark)
    private transferBookmarkRepository: Repository<TransferBookmark>,
    @InjectRepository(TransferMute)
    private transferMuteRepository: Repository<TransferMute>,
    @InjectRepository(TransferRequest)
    private transferRequestRepository: Repository<TransferRequest>,
  ) {}

  async getTransfer(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [transfer, total] = await this.transferRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['seller', 'bookmarks'],
      select: {
        id: true,
        sellerId: true,
        seatGrade: true,
        seatInfo: true,
        sellingPrice: true,
        seatImageOriginal: true,
        description: true,
        createdAt: true,
        seller: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });

    return {
      data: transfer,
      total,
    };
  }

  async getTransferById(id: number) {
    return this.transferRepository.findOne({
      where: { id },
      select: {
        id: true,
        sellerId: true,
        seatGrade: true,
        seatInfo: true,
        sellingPrice: true,
        seatImageOriginal: true,
        description: true,
        createdAt: true,
        seller: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
      relations: ['seller', 'bookmarks'],
    });
  }

  async getTransferBookmark(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [bookmark, total] =
      await this.transferBookmarkRepository.findAndCount({
        skip: offset,
        take: perPage,
        order: { createdAt: 'ASC' },
        select: {
          id: true,
          userId: true,
          createdAt: true,
          transfer: {
            id: true,
            sellerId: true,
            seatGrade: true,
            seatInfo: true,
            sellingPrice: true,
            seatImageOriginal: true,
            description: true,
          },
        },
        relations: ['transfer'],
      });

    return {
      data: bookmark,
      total,
    };
  }

  async getTransferBookmarkById(id: number) {
    return this.transferBookmarkRepository.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
      },
      relations: ['transfer'],
    });
  }

  async getTransferMute(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [mute, total] = await this.transferMuteRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['user', 'transfer'],
      select: {
        id: true,
        userId: true,
        transferId: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
      },
    });
    return {
      data: mute,
      total,
    };
  }

  async getTransferMuteById(id: number) {
    return this.transferMuteRepository.findOne({
      where: { id },
      relations: ['user', 'transfer'],
      select: {
        id: true,
        userId: true,
        transferId: true,
        createdAt: true,
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
      },
    });
  }

  async getTransferRequest(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [request, total] = await this.transferRequestRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['transfer', 'requester'],
      select: {
        id: true,
        transferId: true,
        queuePosition: true,
        status: true,
        respondedAt: true,
        createdAt: true,
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
        requester: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });

    return {
      data: request,
      total,
    };
  }

  async getTransferRequestById(id: number) {
    return this.transferRequestRepository.findOne({
      where: { id },
      relations: ['transfer', 'requester'],
      select: {
        id: true,
        transferId: true,
        queuePosition: true,
        status: true,
        respondedAt: true,
        createdAt: true,
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
        requester: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });
  }
}
