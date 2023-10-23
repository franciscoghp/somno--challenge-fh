import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskDTO } from './task.dto';

export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private tasksRepo: Repository<TaskEntity>,
  ) {}

  async findAll() {
    return await this.tasksRepo.find();
  }

  async findOne(id: number) {
    try {
      const data = await this.tasksRepo.findOne({ where: { id } });
      if (!data)
        return { message: `Task with id ${id} does not exist`, error: true };
      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async create(body: TaskDTO) {
    try {
      const newTask = this.tasksRepo.create(body);
      return await this.tasksRepo.save(newTask);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(id: number, body: TaskDTO) {
    try {
      const data = await this.tasksRepo.findOne({ where: { id } });
      if (!data)
        return { message: `Task with id ${id} does not exist`, error: true };
      await this.tasksRepo.update(id, body);
      return this.tasksRepo.findOne({ where: { id } });
    } catch (error) {
      console.log('EL ERROR EN EL SERVICE ', error);
      return new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.tasksRepo.findOne({ where: { id } });
      if (!data)
        return { message: `Task with id ${id} does not exist`, error: true };
      await this.tasksRepo.delete(id);
      return { message: 'Task was deleted succesdully' };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
