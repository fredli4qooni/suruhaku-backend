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
 * @file        bid.controller.js
 * @description Controller for handling bid-related requests
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const bidService = require('./bid.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const sendResponse = require('../../shared/utils/responseHelper');

class BidController {
  createBid = asyncHandler(async (req, res) => {
    const { task_id, pesuruh_id, offer_price } = req.body;
    const bid = await bidService.createBid(task_id, pesuruh_id, offer_price);
    sendResponse(res, 201, 'Tawaran berhasil dikirim!', bid);
  });

  initiateChat = asyncHandler(async (req, res) => {
    const { bid_id, task_id } = req.body;
    const result = await bidService.initiateChat(bid_id, task_id);
    sendResponse(res, 200, 'Ruang obrolan negosiasi berhasil dibuat', result);
  });

  updateBidPrice = asyncHandler(async (req, res) => {
    const { bid_id, new_price } = req.body;
    const bid = await bidService.updatePrice(bid_id, new_price);
    sendResponse(res, 200, 'Harga penawaran berhasil diperbarui', bid);
  });

  acceptBid = asyncHandler(async (req, res) => {
    const { bid_id, task_id } = req.body;
    const result = await bidService.acceptBid(bid_id, task_id);
    sendResponse(res, 200, 'Sepakat! Dana berhasil ditahan di Escrow.', result);
  });

  getBidsByTask = asyncHandler(async (req, res) => {
    const bids = await bidService.getBids(req.params.task_id);
    sendResponse(res, 200, 'Berhasil mengambil daftar tawaran', bids);
  });
}

module.exports = new BidController();