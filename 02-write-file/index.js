const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.resolve(__dirname, "text.txt"));

stdout.write('Приветствую тебя, о странник! Поведуй мне свои истории.\n');
stdin.on('data', data => {
    const d = data.toString().trim();
    if(d === 'exit') {
        stdout.write('Прощаемся с тобой, о странник!\n');
        process.exit();
    } else {
        stream.write(d)
    }
});

process.on('SIGINT', () => {
    stdout.write('Прощаемся с тобой, о странник!\n');
    process.exit();
});