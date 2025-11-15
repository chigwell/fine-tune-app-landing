"use client";

import { useEffect, useMemo, useState } from 'react';
import { CodeIcon } from "lucide-react";
import { motion, TargetAndTransition } from "framer-motion";

export default function ConsoleAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

    const commands = useMemo(() => [
    '# 1. Create a new draft task to get a task_id',
    'curl -X POST "https://api.fine-tune.app/tasks/draft" -H "Authorization: Bearer $YOUR_TOKEN" -d \'{"name": "My New Model"}\'',
    '',
    '# 2. Upload your raw data files to the draft task',
    'curl -X POST "https://api.fine-tune.app/tasks/$TASK_ID/files" -H "Authorization: Bearer $YOUR_TOKEN" -F "files=@/path/to/your/data1.txt" -F "files=@/path/to/your/data2.txt"',
    '',
    '# 3. Start the dataset creation process from the uploaded files',
    'curl -X POST "https://api.fine-tune.app/tasks/$TASK_ID/dataset" -H "Authorization: Bearer $YOUR_TOKEN" -d \'{"system_prompt": "You are a helpful assistant."}\'',
    '',
    '# 4. Start the fine-tuning job with your desired parameters',
    'curl -X POST "https://api.fine-tune.app/tasks" -H "Authorization: Bearer $YOUR_TOKEN" -d \'{"draft_task_id": "$TASK_ID", "base_model": "NousResearch/Llama-2-7b-hf", "hub_model_id": "your-username/my-finetuned-model", "num_train_epochs": 3}\'',
    '',
    '# 5. Check the status of your fine-tuning task',
    'curl "https://api.fine-tune.app/tasks/$TASK_ID/status" -H "Authorization: Bearer $YOUR_TOKEN"',
    '',
    '# 6. Once complete, convert the fine-tuned model to GGUF format',
    'curl -X POST "https://api.fine-tune.app/tasks/$TASK_ID/gguf" -H "Authorization: Bearer $YOUR_TOKEN" -d \'{"quantization_method": "q4_k_m"}\'',
    '',
    '# 7. Create an Ollama model from the GGUF file',
    'curl -X POST "https://api.fine-tune.app/tasks/$TASK_ID/ollama" -H "Authorization: Bearer $YOUR_TOKEN" -d \'{"model_name": "my-custom-model:latest"}\'',
    '',
    '# 8. (Optional) List all of your fine-tuning tasks',
    'curl "https://api.fine-tune.app/tasks" -H "Authorization: Bearer $YOUR_TOKEN"',
  ], []);

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
          className="bg-gray-800 text-white p-2 md:p-4 rounded-lg shadow-md font-mono overflow-x-auto text-xs md:text-sm w-full max-w-4xl mx-4">
        {lines.join('\n')}
        {lines.length > 0 && '\n'}
        {currentText}
        <span className="animate-pulse">█</span>
      </pre>
    </div>
    </>
  );
}