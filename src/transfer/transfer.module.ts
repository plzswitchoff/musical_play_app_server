import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entity/transfer.entity';
import { TransferBookmark } from './entity/transfer-bookmark.entity';
import { TransferMute } from './entity/transfer-mute.entity';
import { TransferRequest } from './entity/transfer-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transfer,
      TransferBookmark,
      TransferMute,
      TransferRequest,
    ]),
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
