// 添加滚动动画效果
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 背景音乐控制
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // 检查是否支持自动播放
    let isPlaying = false;
    
    // 音乐控制函数
    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch(error => {
                console.log('自动播放被阻止:', error);
                // 显示提示信息
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            });
        }
    }
    
    // 音量控制
    function setVolume() {
        bgMusic.volume = volumeSlider.value;
    }
    
    // 绑定事件
    musicToggle.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', setVolume);
    
    // 初始化音量
    setVolume();
    
    // 尝试自动播放（用户交互后）
    document.addEventListener('click', function initMusic() {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch(error => {
                console.log('自动播放被阻止，需要用户交互');
            });
        }
        document.removeEventListener('click', initMusic);
    });
});