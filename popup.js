document.getElementById('execute').addEventListener('click', () => {
  console.log('Execute button clicked'); 
  chrome.runtime.sendMessage({ action: 'executeCode' });
});
