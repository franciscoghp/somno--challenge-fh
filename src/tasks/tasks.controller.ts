import { Controller, Injectable } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskDTO } from './task.dto';

@Controller('tasks')
@Injectable()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.tasksService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Post()
  async create(@Body() body: TaskDTO) {
    try {
      return await this.tasksService.create(body);
    } catch (error) {
      console.log('EL ERROR MARICO ', error);
      return error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    try {
      return await this.tasksService.update(id, body);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.tasksService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
