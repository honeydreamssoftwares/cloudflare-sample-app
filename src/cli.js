// cli.js
//import fetch from 'node-fetch';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config({ path: '.dev.vars' });

const token = process.env.DISCORD_TOKEN;
const channelId = process.argv[2]; // Assuming the first CLI argument is the Channel ID
const messageContent = process.argv.slice(3).join(' '); // Joining all subsequent arguments as the message content

if (!token) {
  console.error('The DISCORD_TOKEN environment variable is required.');
  process.exit(1);
}

if (!channelId) {
  console.error('Channel ID is required as the first argument.');
  process.exit(1);
}

if (!messageContent) {
  console.error('Message content is required as subsequent arguments.');
  process.exit(1);
}

const url = `https://discord.com/api/v10/channels/${channelId}/messages`;

const postMessage = async () => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${token}`,
      },
      body: JSON.stringify({
        content: messageContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message posted:', data);
  } catch (error) {
    console.error('Failed to post message:', error.message);
  }
};

postMessage();
