const text_out = document.getElementById('app-out');
const in_count = document.getElementById('count');
const in_length = document.getElementById('length');
const in_special = document.getElementById('special');
const buttons = document.getElementById('copy');


const letters = "abcdefghijklmnopqrstuvwxyz"
const LETTERS = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
const numeric = '0123456789';
const punctuation = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

String.prototype.splice = function (idx, str) {
    return this.slice(0, idx) + str + this.slice(idx);
};


function generate() {
    const count_str = in_count.value;
    const length_str = in_length.value;

    const count = Number(count_str);
    const length = Number(length_str);

    let words = [];
    for (let i = 0; i < count; i++) {
        let word = "";

        if (in_special.checked) {
            var numeric_count = Math.ceil(length / 9);
            var punctuation_count = Math.ceil(length * 2 / 9);
        } else {
            var numeric_count = Math.ceil(length / 3);
            var punctuation_count = 0;
        }
        var LETTER_count = Math.floor((length - numeric_count - punctuation_count) / 2);
        var letter_count = Math.ceil((length - numeric_count - punctuation_count) / 2);

        var cur_letters = letters;
        var cur_LETTERS = LETTERS;
        var cur_numeric = numeric;
        var cur_punctuation = punctuation;

        while (numeric_count-- > 0) {
            let rand_char_idx = Math.floor(Math.random() * cur_numeric.length);
            let rand_char = cur_numeric.charAt(rand_char_idx)
            cur_numeric = cur_numeric.slice(0, rand_char_idx) + cur_numeric.slice(rand_char_idx + 1);
            if (cur_numeric.length === 0)
                cur_numeric = numeric
            let rand_pos = Math.floor(Math.random() * word.length)
            word = word.splice(rand_pos, rand_char)
        }
        while (punctuation_count-- > 0) {
            let rand_char_idx = Math.floor(Math.random() * cur_punctuation.length);
            let rand_char = cur_punctuation.charAt(rand_char_idx)
            cur_punctuation = cur_punctuation.slice(0, rand_char_idx) + cur_punctuation.slice(rand_char_idx + 1);
            if (cur_punctuation.length === 0)
                cur_punctuation = punctuation
            let rand_pos = Math.floor(Math.random() * word.length)
            word = word.splice(rand_pos, rand_char)
        }
        while (LETTER_count-- > 0) {
            let rand_char_idx = Math.floor(Math.random() * cur_LETTERS.length);
            let rand_char = cur_LETTERS.charAt(rand_char_idx)
            cur_LETTERS = cur_LETTERS.slice(0, rand_char_idx) + cur_LETTERS.slice(rand_char_idx + 1);
            if (cur_LETTERS.length === 0)
                cur_LETTERS = LETTERS
            let rand_pos = Math.floor(Math.random() * word.length)
            word = word.splice(rand_pos, rand_char)
        }
        while (letter_count-- > 0) {
            let rand_char_idx = Math.floor(Math.random() * cur_letters.length);
            let rand_char = cur_letters.charAt(rand_char_idx)
            cur_letters = cur_letters.slice(0, rand_char_idx) + cur_letters.slice(rand_char_idx + 1);
            if (cur_letters.length === 0)
                cur_letters = letters
            let rand_pos = Math.floor(Math.random() * word.length)
            word = word.splice(rand_pos, rand_char)
        }
        words.push(word)
    }

    buttons.innerHTML = "";
    words.forEach((w) => {
        const bu = document.createElement('button');
        bu.classList.add("copy");
        bu.addEventListener('click', () => {
            navigator.clipboard.writeText(w);
        })

        buttons.appendChild(bu);
    });


    text_out.innerHTML = words.join("\n");
    text_out.style.height = 'auto';
    text_out.style.height = text_out.scrollHeight + 'px';

}
















