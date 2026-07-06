HL.views = HL.views || {};

HL.views.home = {
  render(container) {
    const existingResponse = HL.getTodayResponse();
    let question;

    if (existingResponse) {
      question =
        HL.findQuestion(existingResponse.questionId) ||
        { id: existingResponse.questionId, text: existingResponse.questionText };
    } else {
      question = HL.getRandomQuestion();
    }

    this.renderCard(container, question, existingResponse);
  },

  renderCard(container, question, existingResponse) {
    container.innerHTML = `
      <div class="question-card" id="question-card">
        <p class="question-card__eyebrow">오늘의 질문</p>
        <p class="question-card__text">${question.text}</p>

        <div class="option-grid" id="option-grid" role="group" aria-label="답변 선택">
          ${HL.ANSWER_OPTIONS.map(
            (opt) => `
            <button
              type="button"
              class="option-button"
              data-option-id="${opt.id}"
              aria-pressed="false"
            >
              <span>${opt.label}</span>
              <span class="option-button__check" aria-hidden="true">&#10003;</span>
            </button>
          `
          ).join("")}
        </div>

        <div class="insight-card" id="insight-card">
          <p class="insight-card__label">
            <span class="insight-card__dot" aria-hidden="true"></span>
            오늘의 AI 관찰
          </p>
          <div class="insight-card__body" id="insight-body"></div>
        </div>

        <button type="button" class="next-button" id="next-button" disabled>
          다음 질문
        </button>
      </div>

      <p class="footnote">
        이 관찰은 당신을 규정하지 않아요.<br />
        그저 오늘, 스스로를 조금 더 들여다보는 기록일 뿐이에요.
      </p>
    `;

    const insightBody = container.querySelector("#insight-body");
    const nextButton = container.querySelector("#next-button");
    const optionButtons = container.querySelectorAll(".option-button");

    const setInsightEmpty = () => {
      insightBody.innerHTML =
        '<p class="insight-card__body--empty">답변을 고르면 조용한 관찰 하나가 여기에 남아요.</p>';
    };

    const setInsightLoading = () => {
      insightBody.innerHTML = `
        <div class="skeleton-line" style="width: 85%; margin-bottom: 6px;"></div>
        <div class="skeleton-line" style="width: 55%;"></div>
      `;
    };

    const setInsightText = (text) => {
      const p = document.createElement("p");
      p.style.margin = "0";
      p.textContent = text;
      insightBody.innerHTML = "";
      insightBody.appendChild(p);
    };

    const selectOption = (optionId) => {
      optionButtons.forEach((btn) => {
        const isSelected = btn.dataset.optionId === optionId;
        btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
      nextButton.disabled = false;
      nextButton.classList.add("is-enabled");
    };

    optionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const optionId = btn.dataset.optionId;
        const optionLabel = HL.ANSWER_OPTIONS.find(
          (o) => o.id === optionId
        ).label;

        selectOption(optionId);
        setInsightLoading();

        // 실제 AI API 연동 시 이 setTimeout 블록을 fetch() 호출로 교체한다.
        window.setTimeout(() => {
          const observation = HL.getInsight(question.id, optionId);
          setInsightText(observation);

          HL.upsertResponse({
            date: HL.todayString(),
            questionId: question.id,
            questionText: question.text,
            optionId,
            optionLabel,
            observation,
          });
        }, 500);
      });
    });

    nextButton.addEventListener("click", () => {
      if (nextButton.disabled) return;
      const next = HL.getRandomQuestion(question.id);
      HL.views.home.renderCard(container, next, null);
    });

    if (existingResponse) {
      selectOption(existingResponse.optionId);
      setInsightText(existingResponse.observation);
    } else {
      setInsightEmpty();
    }
  },
};
