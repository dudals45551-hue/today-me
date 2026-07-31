(() => {
  'use strict';

  const cameraInput = document.getElementById('cameraInput');
  const albumInput = document.getElementById('albumInput');
  const modal = document.getElementById('previewModal');
  const previewImage = document.getElementById('previewImage');
  const previewTitle = document.getElementById('previewTitle');
  const previewMessage = document.getElementById('previewMessage');
  const confirmPhoto = document.getElementById('confirmPhoto');
  const toast = document.getElementById('toast');

  let selectedChild = '';
  let selectedMode = '';
  let currentObjectUrl = '';

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  };

  document.querySelectorAll('[data-child][data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedChild = button.dataset.child;
      selectedMode = button.dataset.mode;

      if (selectedMode === 'camera') {
        cameraInput.value = '';
        cameraInput.click();
      } else {
        albumInput.value = '';
        albumInput.click();
      }
    });
  });

  const handleImage = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('사진 파일만 선택할 수 있어요.');
      return;
    }

    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);
    previewImage.src = currentObjectUrl;
    previewTitle.textContent = `${selectedChild}의 오늘`;
    previewMessage.textContent =
      selectedMode === 'camera'
        ? '카메라로 찍은 사진이 잘 들어왔어요!'
        : '앨범에서 고른 사진이 잘 들어왔어요!';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  cameraInput.addEventListener('change', handleImage);
  albumInput.addEventListener('change', handleImage);

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  confirmPhoto.addEventListener('click', () => {
    showToast(`${selectedChild} 사진 등록 완료! 다음 단계에서 꾸미기를 연결할게요.`);
    closeModal();
  });

  document.querySelector('.star-button').addEventListener('click', () => {
    showToast('별 모으기 기능은 다음 버전에서 연결할게요 ⭐');
  });

  document.querySelector('.profile-button').addEventListener('click', () => {
    showToast('프로필 기능은 준비 중이에요.');
  });

  document.addEventListener('gesturestart', (event) => event.preventDefault());
  document.addEventListener('dblclick', (event) => event.preventDefault(), { passive: false });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
