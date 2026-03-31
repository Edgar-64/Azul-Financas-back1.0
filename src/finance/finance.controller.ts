import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../common/guards/auth.guard'; 

@Controller('finance')
@UseGuards(AuthGuard) 
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  create(@Body() data: any) {
    return this.financeService.create(data);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.financeService.findAll(userId ? Number(userId) : undefined);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.financeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financeService.remove(+id);
  }
}