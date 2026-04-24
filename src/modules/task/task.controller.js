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
 * @file        task.controller.js
 * @description Controller for handling task-related requests
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const taskService = require('./task.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const sendResponse = require('../../shared/utils/responseHelper');

class TaskController {
  createTask = asyncHandler(async (req, res) => {
    const task = await taskService.createTask(req.body);
    sendResponse(res, 201, 'Tugas berhasil dibuat', task);
  });

  getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getCustomerTasks(req.params.customer_id);
    sendResponse(res, 200, 'Berhasil mengambil tugas Anda', tasks);
  });

  getPesuruhFeed = asyncHandler(async (req, res) => {
    const tasks = await taskService.getPesuruhTasks();
    sendResponse(res, 200, 'Berhasil mengambil lowongan tersedia', tasks);
  });

  getTaskById = asyncHandler(async (req, res) => {
    const task = await taskService.getTaskDetail(req.params.id);
    sendResponse(res, 200, 'Berhasil mengambil detail tugas', task);
  });

  completeTask = asyncHandler(async (req, res) => {
    const { task_id } = req.body;
    const task = await taskService.completeTask(task_id);
    sendResponse(res, 200, 'Tugas berhasil diselesaikan', task);
  });
}

module.exports = new TaskController();