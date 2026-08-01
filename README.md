# 오늘의 나 V5.7.2 — 스티커 애니메이션 수정

원인
- 캐릭터 꾸미기 화면을 열 때 스티커 class를 초기화하면서 애니메이션 class도 함께 삭제되고 있었음

수정
- 화면을 열어도 스티커별 애니메이션 class 유지
- 삼성 인터넷용 transform-box / transform-origin 보강
- 움직임이 눈에 보이도록 강도 조정
- 드래그 중에는 멈추고 손을 떼면 다시 움직임
- 저장 사진은 정적인 이미지로 저장

확인:
https://dudals45551-hue.github.io/today-me/?v=572
