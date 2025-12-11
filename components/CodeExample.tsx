"use client";

import { useEffect, useMemo, useState } from 'react';
import { CodeIcon } from "lucide-react";
import { motion, TargetAndTransition } from "framer-motion";

export default function ConsoleAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const commands = useMemo(
      () => [
        '# 1. Upload a dataset file',
        'curl -X POST "https://api.fine-tune.app/files" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>" \\',
        '  -F "file_type=dataset_jsonl" \\',
        '  -F "file=@/path/to/dataset.jsonl"',
        '',
        '# 2. Create a dataset config using that file_id',
        'curl -X POST "https://api.fine-tune.app/dataset-configs" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"name":"my-dataset","source_type":"jsonl_qa","files":[{"file_id":<FILE_ID>,"split_role":"train"}]}\'',
        '',
        '# 3. Create a fine-tune task (returns task.id)',
        'curl -X POST "https://api.fine-tune.app/tasks" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"base_model_id":<BASE_MODEL_ID>,"dataset_config_id":<DATASET_CONFIG_ID>,"project_name":"my-model","learning_rate":0.0002,"batch_size":1,"grad_accumulation":4,"epochs":3,"max_seq_length":2048,"optim":"adamw_torch","lr_scheduler_type":"cosine","logging_steps":10,"save_strategy":"epoch","eval_strategy":"no","bf16":true}\'',
        '',
        '# 4. Start the fine-tune task',
        'curl -X POST "https://api.fine-tune.app/tasks/<TASK_ID>/start" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{}\'',
        '',
        '# 5. Fetch training logs',
        'curl -X GET "https://api.fine-tune.app/tasks/<TASK_ID>/logs?limit=50&offset=0" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>"',
        '',
        '# 6. Download the GGUF bundle when ready',
        'curl -L -X GET "https://api.fine-tune.app/files/<GGUF_FILE_ID>/download-gguf" \\',
        '  -H "Authorization: Bearer <YOUR_API_KEY>" \\',
        '  -o "my-model-gguf.zip"',
      ],
      [],
    );


  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const command = commands[currentCommandIndex];
    let i = 0;

    // Immediately add first character for new line
    if (command.length > 0) {
      setCurrentText(command.charAt(0));
      i = 1;
    }

    const interval = setInterval(() => {
      if (i < command.length) {
        setCurrentText(prev => prev + command.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setLines(prev => [...prev, command]);
        setCurrentText('');

        setTimeout(() => {
          setCurrentCommandIndex(prev => prev + 1);
        }, command === '' ? 0 : 400);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [currentCommandIndex, commands]);

  return (

    <>
      <div id="example" className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.h3
              id="featured-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3"
            >
              <CodeIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Example Usage
              </span>
            </motion.h3>
        </div>
      </div>
    <div  className="relative group flex items-center justify-center py-6 sm:py-10">
      <pre style={{ minHeight: '320px', maxWidth: '768px' }}
          className="bg-gradient-to-br from-[#0b1437] via-[#111c44] to-[#0b1437] text-[#e9ecef] p-2 md:p-4 rounded-2xl shadow-xl border border-[#3D9AC6]/30 font-mono overflow-x-auto text-xs md:text-sm w-full max-w-4xl mx-4">
        {lines.join('\n')}
        {lines.length > 0 && '\n'}
        {currentText}
        <span className="animate-pulse text-[#83CEF2]">█</span>
      </pre>
    </div>
    </>
  );
}
