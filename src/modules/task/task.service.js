/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                      FREDLI FOURQONI                         ║
 * ║                    Software Developer                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * @author      Fredli Fourqoni
 * @github      https://github.com/fredli4qooni
 * @copyright   Copyright (c) 2026 Fredli Fourqoni. All rights reserved.
 * @license     Apache License, Version 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ──────────────────────────────────────────────────────────────
 * @file        task.service.js
 * @description Service for handling task-related business logic
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const taskRepository = require('./task.repository');
const AppError = require('../../shared/errors/AppError');

class TaskService {
  async createTask(taskData) {
    if (!taskData.title || !taskData.customer_id) {
      throw new AppError('Data tugas tidak lengkap', 400);
    }
    return await taskRepository.create({ ...taskData, status: 'open' });
  }

  async getCustomerTasks(customerId) {
    if (!customerId) throw new AppError('ID Customer diperlukan', 400);
    return await taskRepository.findByCustomerId(customerId);
  }

  async getPesuruhTasks() {
    return await taskRepository.findOpenTasks();
  }

  async getTaskDetail(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw new AppError('Tugas tidak ditemukan', 404);
    return task;
  }

  async completeTask(taskId) {
    if (!taskId) throw new AppError('ID Tugas diperlukan', 400);
    return await taskRepository.updateStatus(taskId, 'completed');
  }
}

module.exports = new TaskService();