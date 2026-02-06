import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  getTransfers(@Query('page') page: number) {
    return this.transferService.getTransfer(page);
  }

  @Get('bookmark')
  getTransferBookmark(@Query('page') page: number) {
    return this.transferService.getTransferBookmark(page);
  }

  @Get('bookmark/:id')
  getTransferBookmarkById(@Param('id') id: number) {
    return this.transferService.getTransferBookmarkById(id);
  }

  @Get('mute')
  getTransferMute(@Query('page') page: number) {
    return this.transferService.getTransferMute(page);
  }

  @Get('mute/:id')
  getTransferMuteById(@Param('id') id: number) {
    return this.transferService.getTransferMuteById(id);
  }

  @Get('request')
  getTransferRequest(@Query('page') page: number) {
    return this.transferService.getTransferRequest(page);
  }

  @Get('request/:id')
  getTransferRequestById(@Param('id') id: number) {
    return this.transferService.getTransferRequestById(id);
  }

  @Get('/:id')
  getTransferById(@Param('id') id: number) {
    return this.transferService.getTransferById(id);
  }
}
