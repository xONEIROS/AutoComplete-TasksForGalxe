/* 
 * All rights reserved. Unauthorized copying, distribution, modification, 
 * or any other use of this code is strictly prohibited. Please refer to the LICENSE file.
 *
 * Developer's Twitter: https://x.com/0xOneiros
 * Developer's Telegram Channel: https://t.me/xOneiros
 *
 * ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████
 * █░░░░░░░░░░░░░░█░░░░░░██████████░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░░░███░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█
 * █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░░░░░░░░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
 * █░░▄▀░░░░░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█░░░░▄▀░░░░█░░▄▀░░░░░░░░▄▀░░███░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█
 * █░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░██░░▄▀░░█░░▄▀░░███████████░░▄▀░░███░░▄▀░░████░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░█████████
 * █░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░███░░▄▀░░███░░▄▀░░░░░░░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█
 * █░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░███░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
 * █░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░███░░▄▀░░███░░▄▀░░░░░░▄▀░░░░███░░▄▀░░██░░▄▀░░█░░░░░░░░░░▄▀░░█
 * █░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░░░░░▄▀░░█░░▄▀░░███████████░░▄▀░░███░░▄▀░░██░░▄▀░░█████░░▄▀░░██░░▄▀░░█████████░░▄▀░░█
 * █░░▄▀░░░░░░▄▀░░█░░▄▀░░██░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░░░░░░░░░█░░░░▄▀░░░░█░░▄▀░░██░░▄▀░░░░░░█░░▄▀░░░░░░▄▀░░█░░░░░░░░░░▄▀░░█
 * █░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░░░░░░░░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
 * █░░░░░░░░░░░░░░█░░░░░░██████████░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░█░░░░░░██░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█
 * ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████
 */


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'executeCode') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url) {
        console.log('Active Tab URL:', activeTab.url);  
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: executeCode
        });
      } else {
        console.error('Active tab is undefined or has no URL');
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Galxe Auto Clicker',
          message: 'Unable to execute script: No active tab with a URL found'
        });
      }
    });
  }
});

function executeCode() {
  const elementsToClick = document.querySelectorAll(
      'div[data-state="closed"] .cursor-pointer'
    ),
    refreshButtonClass =
      'button[data-state="closed"] .ml-4.flex.gap-4.items-center',
    waitForClass = 'svg[data-state="closed"] .ml-4.flex.gap-4.items-center',
    successIconClass = '.text-size-14.font-bold',
    claimButtonSelector = 'button.inline-flex.bg-primary:not([disabled])',
    closeButtonSelector =
      'button.absolute.rounded-sm.opacity-70.right-5.top-6.sm\\:right-9.sm\\:top-9';

  function clickElement(element) {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  }

  function closePopup() {
    const closeButton = document.querySelector(closeButtonSelector);
    if (closeButton) {
      clickElement(closeButton);
      console.log('Popup closed.');
    }
  }
  function checkClaimButton() {
    const claimButton = document.querySelector(claimButtonSelector);
    if (claimButton && claimButton.textContent.trim() !== 'Explore Now') {
      clickElement(claimButton);
      console.log('Claim button clicked. Subscribe: https://t.me/xOneiros');
      setTimeout(closePopup, 2000);
      return true;
    }
    return false;
  }

  function checkConditionsAndRetry() {
    const waitForElements = document.querySelectorAll(waitForClass),
      successIcons = document.querySelectorAll(successIconClass);
    if (waitForElements.length > 0 || successIcons.length !== elementsToClick.length) {
      setTimeout(processElements, 60000);
    } else {
      checkClaimButton();
    }
  }

  function processElements() {
    if (!checkClaimButton()) {
      elementsToClick.forEach((element) => {
        if (element.textContent.trim() !== 'Explore Now') {
          clickElement(element);
        }
      });
      setTimeout(() => {
        const refreshButtons = document.querySelectorAll(refreshButtonClass);
        refreshButtons.forEach(clickElement);
        setTimeout(checkConditionsAndRetry, 2000);
      }, 2000);
    }
  }

  processElements();
}
