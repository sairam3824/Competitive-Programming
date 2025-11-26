#!/usr/bin/env node

/**
 * Competitive Companion Listener
 * Receives problem data from the browser extension and creates files automatically
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load configuration
let CONFIG = {
  defaultLanguage: 'cpp',
  createTestFiles: true,
  openInEditor: false,
  port: 10043,
  host: '127.0.0.1',
};

const configPath = path.join(__dirname, 'listener.config.json');
if (fs.existsSync(configPath)) {
  try {
    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    CONFIG = { ...CONFIG, ...userConfig };
  } catch (error) {
    console.warn('⚠️  Could not load config file, using defaults');
  }
}

const PORT = CONFIG.port;
const HOST = CONFIG.host;

// Language-specific settings
const LANG_CONFIG = {
  cpp: {
    folder: 'codes/cpp/src',
    testFolder: 'codes/cpp',
    extension: '.cc',
    template: 'templates/template.cc',
  },
  java: {
    folder: 'codes/java',
    extension: '.java',
    template: 'templates/template.java',
  },
  py: {
    folder: 'codes/py',
    extension: '.py',
    template: 'templates/template.py',
  },
};

function sanitizeFilename(name) {
  // Remove special characters and spaces
  return name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
}

function extractProblemName(problem) {
  // Try to get a simple problem name (like A, B, C, etc.)
  const nameMatch = problem.name.match(/^([A-Z])\b/);
  if (nameMatch) {
    return nameMatch[1];
  }
  
  // Otherwise use sanitized name
  return sanitizeFilename(problem.name);
}

function createProblemFiles(problem) {
  const lang = CONFIG.defaultLanguage;
  const langConfig = LANG_CONFIG[lang];
  
  const problemName = extractProblemName(problem);
  const filename = problemName + langConfig.extension;
  const filepath = path.join(__dirname, langConfig.folder, filename);
  const testFolderPath = path.join(__dirname, langConfig.testFolder || langConfig.folder);
  
  console.log(`\n📝 Creating problem: ${problem.name}`);
  console.log(`   URL: ${problem.url}`);
  console.log(`   Time Limit: ${problem.timeLimit}ms`);
  console.log(`   Memory Limit: ${problem.memoryLimit}MB`);
  
  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`⚠️  File ${filename} already exists in ${langConfig.folder}/`);
    return;
  }
  
  // Copy template to new file and update placeholders
  const templatePath = path.join(__dirname, langConfig.template);
  if (fs.existsSync(templatePath)) {
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace PROBLEM_NAME placeholder with actual problem name
    templateContent = templateContent.replace(/PROBLEM_NAME/g, problemName);
    
    fs.writeFileSync(filepath, templateContent);
    console.log(`✅ Created ${langConfig.folder}/${filename}`);
  } else {
    console.log(`❌ Template not found: ${templatePath}`);
    return;
  }
  
  // Create test case files
  if (CONFIG.createTestFiles && problem.tests && problem.tests.length > 0) {
    problem.tests.forEach((test, index) => {
      const testNum = index + 1;
      const inputFile = path.join(
        testFolderPath,
        `${problemName}-${testNum}.in`
      );
      const outputFile = path.join(
        testFolderPath,
        `${problemName}-${testNum}.out`
      );
      
      fs.writeFileSync(inputFile, test.input);
      fs.writeFileSync(outputFile, test.output);
      console.log(`   📄 Created test case ${testNum}`);
    });
  }
  
  // Create a problem info file
  const infoFile = path.join(
    testFolderPath,
    `${problemName}.info.txt`
  );
  const infoContent = `Problem: ${problem.name}
URL: ${problem.url}
Time Limit: ${problem.timeLimit}ms
Memory Limit: ${problem.memoryLimit}MB
Tests: ${problem.tests ? problem.tests.length : 0}

${problem.tests && problem.tests.length > 0 ? 'Test cases created:' : 'No test cases available'}
${problem.tests ? problem.tests.map((_, i) => `  - ${problemName}-${i + 1}.in / ${problemName}-${i + 1}.out`).join('\n') : ''}
`;
  fs.writeFileSync(infoFile, infoContent);
  
  console.log(`\n🎉 Ready to solve! Run: cfrun ${filename}`);
}

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const problem = JSON.parse(body);
        createProblemFiles(problem);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Competitive Companion Listener is running!\n');
  }
});

server.listen(PORT, HOST, () => {
  console.log('🚀 Competitive Companion Listener started!');
  console.log(`   Listening on http://${HOST}:${PORT}`);
  console.log(`   Default language: ${CONFIG.defaultLanguage}`);
  console.log('\n📌 Make sure Competitive Companion extension is installed in your browser');
  console.log('   Chrome: https://chrome.google.com/webstore/detail/competitive-companion/cjnmckjndlpiamhfimnnjmnckgghkjbl');
  console.log('   Firefox: https://addons.mozilla.org/en-US/firefox/addon/competitive-companion/');
  console.log('\n⌨️  Press Ctrl+C to stop\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down listener...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
