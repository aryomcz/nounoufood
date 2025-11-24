import { translate } from '@vitalets/google-translate-api';

const text = process.argv[2];
const target = process.argv[3] || 'en';

translate(text, { to: target })
    .then(res => {
        console.log(res.text);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
