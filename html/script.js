class sorcialShareTag extends HTMLElement {
	constructor() {
		super();
		document.addEventListener('DOMContentLoaded', async () => {
			if (this.getAttribute('type') == 'system' && !navigator.share) {
				this.classList.add('none');
			}
			if (this.getAttribute('type') == 'sms' && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
				this.classList.add('none')
			}
		})
		this.addEventListener('click', async () => {
			switch (this.getAttribute('type')) {
				case 'system':
					try {
						navigator.share({
							title: this.dataset['paramText'],
							text: '',
							url: 'https://www.w-pcp.net'
						}).catch((reason) => {
							console.error(reason)
						})
					} catch (error) {
						Swal.fire({
							icon: 'error',
							title: '共有に失敗しました。',
							text: 'ブラウザに共有機能がない可能性があります。'
						})
					}
					break;
				case 'twitter':
					window.open('https://twitter.com/intent/tweet?hashtags=%E6%97%A9%E7%A8%B2%E7%94%B0%E4%B8%AD%E5%AD%A6%E6%A0%A1&text=' + this.dataset['paramText'] + '&url=https%3A%2F%2Fwww.w-pcp.net&via=waseda_pcp');
					break;
				case 'line':
					window.open('https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fwww.w-pcp.net');
					break;
				case 'email':
					window.open('mailto:?subject=%E6%97%A9%E7%A8%B2%E7%94%B0%E4%B8%AD%E5%AD%A6%E6%A0%A1%E3%83%BB%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1%E3%81%AE%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E8%A6%8B%E3%81%A6%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%EF%BC%81&body=https%3A%2F%2Fwww.w-pcp.net%2F&recipient=')
					break;
				case 'sms':
					window.open('sms:?body=' + this.dataset['paramText'] + '+https%3A%2F%2Fwww.w-pcp.net');
					break;
			}
		})
	}

	static get observedAttributes() {
		return ['type'];
	}
}
customElements.define('social-share', sorcialShareTag);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}