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
 * @file        bid.repository.js
 * @description Repository for handling bid-related database operations
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const supabase = require('../../config/supabase');
const { db } = require('../../config/firebase');

class BidRepository {
  async create(bidData) {
    const { data, error } = await supabase.from('bids').insert([bidData]).select();
    if (error) throw error;
    return data[0];
  }

  async findByIdWithDetails(bidId) {
    const { data, error } = await supabase
      .from('bids')
      .select('*, tasks ( customer_id )')
      .eq('id', bidId)
      .single();
    if (error) throw error;
    return data;
  }

  async updateBid(bidId, updateData) {
    const { data, error } = await supabase.from('bids').update(updateData).eq('id', bidId).select();
    if (error) throw error;
    return data[0];
  }

  async rejectOtherBids(taskId, acceptedBidId) {
    const { error } = await supabase.from('bids').update({ status: 'rejected' }).eq('task_id', taskId).neq('id', acceptedBidId);
    if (error) throw error;
  }

  async updateTaskAndLockEscrow(taskId, pesuruhId, customerId, amount) {
    const { error: taskError } = await supabase.from('tasks').update({ status: 'taken', pesuruh_id: pesuruhId }).eq('id', taskId);
    if (taskError) throw taskError;

    const { error: trxError } = await supabase.from('transactions').insert([{
      task_id: taskId, sender_id: customerId, receiver_id: pesuruhId, amount, status: 'escrow'
    }]);
    if (trxError) throw trxError;
  }

  async findBidsByTask(taskId) {
    const { data, error } = await supabase
      .from('bids')
      .select('*, users:pesuruh_id (name, phone)')
      .eq('task_id', taskId)
      .order('offer_price', { ascending: true });
    if (error) throw error;
    return data;
  }

  async createOrUpdateChatRoom(taskId, chatData) {
    const chatRoomRef = db.collection('chat_rooms').doc(taskId);
    await chatRoomRef.set(chatData, { merge: true });
  }
}

module.exports = new BidRepository();