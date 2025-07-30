import { Controller, Get } from '@nestjs/common';

@Controller('reusable')
export class ReusableController {
    @Get('*')
    handleAll(): string {
        return 'redirection succeeded';
    }
}
