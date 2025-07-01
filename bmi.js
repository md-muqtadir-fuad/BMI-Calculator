
    // Update form labels on unit switch
    const unitsRadios = document.getElementsByName('units');
    const labelWeight = document.getElementById('labelWeight');
    const labelHeight = document.getElementById('labelHeight');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');

    function setLabels(unit) {
      if (unit === 'metric') {
        labelWeight.textContent = 'Weight (kg):';
        labelHeight.textContent = 'Height (cm):';
        weightInput.placeholder = 'e.g. 68';
        heightInput.placeholder = 'e.g. 175';
        weightInput.min = '1';
        heightInput.min = '1';
      } else {
        labelWeight.textContent = 'Weight (lb):';
        labelHeight.textContent = 'Height (in):';
        weightInput.placeholder = 'e.g. 150';
        heightInput.placeholder = 'e.g. 70';
        weightInput.min = '1';
        heightInput.min = '1';
      }
    }

    unitsRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        setLabels(radio.value);
        // Clear inputs/results when unit changes
        weightInput.value = '';
        heightInput.value = '';
        document.getElementById('result').textContent = '';
        document.getElementById('result').style.background = '';
      });
    });

    // Initial label setup
    setLabels('metric');

    // BMI calculation logic
    document.getElementById('bmiForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const unit = document.querySelector('input[name="units"]:checked').value;
      const weight = parseFloat(weightInput.value);
      const height = parseFloat(heightInput.value);

      // Validate
      if (!weight || !height || weight <= 0 || height <= 0) {
        showResult("Please enter valid positive numbers.", "");
        return;
      }

      let bmi = 0;
      if (unit === 'metric') {
        // Height in meters
        bmi = weight / Math.pow(height / 100, 2);
      } else {
        // BMI = 703 * lbs / inches^2
        bmi = 703 * (weight / (height * height));
      }

      // Determine status and advice
      let status = '', color = '', advice = '';
      if (bmi < 18.5) {
        status = 'Underweight';
        color = 'var(--underweight)';
        advice = 'You are underweight. Consider consulting with a healthcare professional for nutritional guidance.';
      } else if (bmi < 24.9) {
        status = 'Normal weight';
        color = 'var(--normal)';
        advice = 'You are at a healthy weight! Maintain your current lifestyle for continued health.';
      } else if (bmi < 29.9) {
        status = 'Overweight';
        color = 'var(--overweight)';
        advice = 'You are overweight. Consider a balanced diet and regular exercise to improve your health.';
      } else {
        status = 'Obese';
        color = 'var(--obese)';
        advice = 'You are in the obese range. It is recommended to seek advice from a healthcare professional.';
      }

      showResult(`
        <strong>BMI:</strong> ${bmi.toFixed(1)}<br>
        <strong>Status:</strong> ${status}<br>
        <span style="font-size:0.97em;display:block;margin-top:0.6em;"><em>${advice}</em></span>
      `, color);
    });

    function showResult(html, bg) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = html;
      resultDiv.style.background = bg;
    }
