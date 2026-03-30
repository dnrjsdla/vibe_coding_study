const adjectives = [
  'happy', 'cool', 'fast', 'bright', 'wild', 'lazy', 'brave', 'calm',
  'dark', 'epic', 'free', 'great', 'holy', 'icy', 'jolly', 'kind',
  'lively', 'mighty', 'noble', 'odd', 'proud', 'quiet', 'rare', 'sharp',
  'tiny', 'ultra', 'vivid', 'warm', 'xenial', 'young', 'zesty'
];

const nouns = [
  'tiger', 'panda', 'falcon', 'wolf', 'eagle', 'shark', 'lion', 'fox',
  'bear', 'deer', 'hawk', 'orca', 'lynx', 'mole', 'newt', 'owl',
  'pike', 'quail', 'raven', 'seal', 'toad', 'viper', 'wren', 'yak',
  'zebra', 'crane', 'bison', 'cobra', 'dingo', 'finch'
];

const history = [];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId() {
  const useAdj = document.getElementById('useAdjective').checked;
  const useNum = document.getElementById('useNumber').checked;
  const digits = parseInt(document.getElementById('digitCount').value);

  let id = '';
  if (useAdj) id += getRandom(adjectives) + '_';
  id += getRandom(nouns);
  if (useNum) {
    const num = Math.floor(Math.random() * Math.pow(10, digits))
      .toString()
      .padStart(digits, '0');
    id += num;
  }

  return id;
}

function addToHistory(id) {
  if (history.includes(id)) return;
  history.unshift(id);
  if (history.length > 10) history.pop();

  const list = document.getElementById('historyList');
  list.innerHTML = history.map(item => `<li onclick="selectId('${item}')">${item}</li>`).join('');
}

function selectId(id) {
  document.getElementById('idDisplay').textContent = id;
  document.getElementById('result').classList.remove('hidden');
}

// ── 다크/라이트 모드 전환 ──
const themeToggle = document.getElementById('themeToggle');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// 저장된 테마 또는 시스템 설정 적용
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark'));
});

// ── 아이디 생성 ──
document.getElementById('generateBtn').addEventListener('click', () => {
  const id = generateId();
  document.getElementById('idDisplay').textContent = id;
  document.getElementById('result').classList.remove('hidden');
  addToHistory(id);
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const id = document.getElementById('idDisplay').textContent;
  navigator.clipboard.writeText(id).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '복사됨!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '복사';
      btn.classList.remove('copied');
    }, 1500);
  });
});
