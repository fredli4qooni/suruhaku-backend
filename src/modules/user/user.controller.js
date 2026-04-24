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
 * @file        user.controller.js
 * @description Controller for handling user-related requests
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const userService = require('./user.service');
const asyncHandler = require('../../shared/utils/asyncHandler');
const sendResponse = require('../../shared/utils/responseHelper');

class UserController {
  login = asyncHandler(async (req, res) => {
    const { name, phone, role } = req.body;
    
    const user = await userService.loginOrRegister(name, phone, role);
    
    sendResponse(res, 200, 'Berhasil masuk ke aplikasi', user);
  });
}

module.exports = new UserController();