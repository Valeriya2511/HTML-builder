const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.resolve(__dirname, "text.txt"));

stdout.write('Приветствую тебя, о странник! Поведуй мне свои истории.\n');
stdin.on('data', data => {
    const d = data.toString().trim();
    if(d === 'exit') {
        process.exit((stdout.write('Прощаемся с тобой, о странник!\n')))
    } else {
        stream.write(d)
    }
});

process.on('SIGINT', () => {
    process.exit((stdout.write('Прощаемся с тобой, о странник!\n')))
});