'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var ENTER_KEY_CODE = "Enter";
var ESC_KEY_CODE = "Escape";

var setupWindow = document.querySelector('.setup');

var getRandom = function (array) {
  var i = Math.floor(Math.random() * array.length);
  return array[i];
};

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push({
      name: getRandom(NAMES) + ' ' + getRandom(SURNAMES),
      coatColor: getRandom(COAT_COLORS),
      eyesColor: getRandom(EYES_COLORS)
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var similarWizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = generateWizards();
var fragment = document.createDocumentFragment();
var setupSimilar = document.querySelector('.setup-similar');

setupSimilar.classList.remove('hidden');

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarWizardsList.appendChild(fragment);

//-----------Ex#4------------

var setupOpenBlock = document.querySelector('.setup-open');
var setupCloseBlock = setupWindow.querySelector('.setup-close');
var userNameInput = setupWindow.querySelector('.setup-user-name');

var closePopup = function() {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);
};

var openPopup = function() {
  setupWindow.classList.remove('hidden');
};

var onSetupWindowEscPress = document.addEventListener('keydown', function(evt) {
  if  (evt.key === ESC_KEY_CODE && userNameInput !== document.activeElement) {
    closePopup();
  }
});

var showSetupWindow = function() {
  openPopup();
  document.addEventListener('keydown', onSetupWindowEscPress);
};

setupOpenBlock.addEventListener('click', showSetupWindow);

setupOpenBlock.addEventListener('keydown', function(evt) {
  if (evt.key === ENTER_KEY_CODE) {
    showSetupWindow();
  }
});

setupCloseBlock.addEventListener('click', closePopup);

setupCloseBlock.addEventListener('keydown', function(evt) {
  if  (evt.key === ENTER_KEY_CODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('The name must to have 2 chars minimum');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('The name should have up to 25 chars');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Required field. Please, input a name');
  }
});
