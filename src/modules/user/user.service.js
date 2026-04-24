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
 * @file        user.service.js
 * @description Service for handling user-related business logic
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const userRepository = require('./user.repository');
const AppError = require('../../shared/errors/AppError');

class UserService {
  async loginOrRegister(name, phone, role) {
    if (!phone) throw new AppError('Nomor HP wajib diisi', 400);

    let user = await userRepository.findByPhone(phone);

    if (!user) {
      if (!name || !role) throw new AppError('Nama dan Role wajib diisi untuk pendaftaran', 400);
      user = await userRepository.create({ name, phone, role });
    }

    return user;
  }
}

module.exports = new UserService();