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
 * @file        bid.service.js
 * @description Service for handling bid-related business logic
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const bidRepository = require('./bid.repository');
const AppError = require('../../shared/errors/AppError');

class BidService {
  async createBid(task_id, pesuruh_id, offer_price) {
    if (!task_id || !pesuruh_id || !offer_price) throw new AppError('Data penawaran tidak lengkap', 400);
    return await bidRepository.create({ task_id, pesuruh_id, offer_price, status: 'pending' });
  }

  async initiateChat(bid_id, task_id) {
    const bidData = await bidRepository.findByIdWithDetails(bid_id);
    if (!bidData) throw new AppError('Penawaran tidak ditemukan', 404);

    await bidRepository.createOrUpdateChatRoom(task_id, {
      task_id,
      customer_id: bidData.tasks.customer_id,
      pesuruh_id: bidData.pesuruh_id,
      bid_id,
      status: 'negotiating',
      created_at: new Date().toISOString()
    });

    await bidRepository.updateBid(bid_id, { status: 'negotiating' });
    return { chat_room_id: task_id };
  }

  async updatePrice(bid_id, new_price) {
    if (!bid_id || !new_price) throw new AppError('Data tidak valid', 400);
    return await bidRepository.updateBid(bid_id, { offer_price: new_price });
  }

  async acceptBid(bid_id, task_id) {
    const bidData = await bidRepository.findByIdWithDetails(bid_id);
    if (!bidData) throw new AppError('Penawaran tidak ditemukan', 404);

    await bidRepository.updateBid(bid_id, { status: 'accepted' });
    await bidRepository.rejectOtherBids(task_id, bid_id);
    await bidRepository.updateTaskAndLockEscrow(task_id, bidData.pesuruh_id, bidData.tasks.customer_id, bidData.offer_price);
    await bidRepository.createOrUpdateChatRoom(task_id, { status: 'active' });

    return { escrow_amount: bidData.offer_price };
  }

  async getBids(taskId) {
    if (!taskId) throw new AppError('ID Tugas diperlukan', 400);
    return await bidRepository.findBidsByTask(taskId);
  }
}

module.exports = new BidService();