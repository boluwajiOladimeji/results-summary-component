const scoreContainer = document.querySelector('.score-container');
const avgScoreEl = document.querySelector('.avg-score');
const scoreTitleEl = document.querySelector('.score-title');
const scoreRemarkEl = document.querySelector('.score-remark');

const fetchData = async () => {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
};

const displayRemarks = (data) => {
  scoreContainer.innerHTML = data
    .map((grade) => {
      return `<div class="score-info ${grade.category.toLowerCase()}">
              <img src="${grade.icon}">
                <p class="summary-title">${grade.category}</p>
                 <p class="summary-score"><span>${grade.score}</span> /100</p>
            </div>`;
    })
    .join('');
};

const calcAverage = (data) => {
  let total = 0;
  let avg;
  for (let item of data) {
    total += item.score;
  }
  avg = Math.floor(total / data.length);
  avgScoreEl.textContent = avg;
  if (avg < 50) {
    scoreTitleEl.textContent = `fair`;
    scoreRemarkEl.textContent = `You scored lower than 50% of the people who have taken these tests`;
  }

  if (avg > 80) {
    scoreTitleEl.textContent = `awesome`;
    scoreRemarkEl.textContent = `You scored higher than 80% of the people who have taken these tests`;
  }
};

const showRemarks = async () => {
  let data = await fetchData();
  displayRemarks(data);
  calcAverage(data);
};

showRemarks();
