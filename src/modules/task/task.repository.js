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
 * @file        task.repository.js
 * @description Repository for handling task-related database operations
 * @created     2026-04-24
 * ──────────────────────────────────────────────────────────────
 */

const supabase = require('../../config/supabase');

class TaskRepository {
  async create(taskData) {
    const { data, error } = await supabase.from('tasks').insert([taskData]).select().single();
    if (error) throw error;
    return data;
  }

  async findByCustomerId(customerId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async findOpenTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateStatus(id, status) {
    const { data, error } = await supabase.from('tasks').update({ status }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
}

module.exports = new TaskRepository();