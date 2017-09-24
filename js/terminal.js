class TerminalHandler {
  constructor () {
    this.element = document.querySelector('.term-widget .interactive')
  }

  get userAgent () {
    return window.navigator.userAgent
  }
  get userPlatform () {
    return window.navigator.platform
  }
  get userPlugins () {
    let plugins = []
    for (let i = 0; i < window.navigator.plugins.length; i++) {
      plugins.push(window.navigator.plugins[i].name)
    }
    return plugins.join('\n')
  }
  writeLocalIp () {
    let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    if (typeof PeerConnection === 'undefined') return false
    let conn = new PeerConnection({iceServers:[]})
    let noop = function(){}    
    conn.createDataChannel("");
    conn.createOffer(conn.setLocalDescription.bind(conn), noop)
    conn.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return
        }
        var ip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        this.writeLine(`Target local IP: ${ip}`)
        conn.onicecandidate = noop;
    }
  }

  writeLine (text) {
    let lineElement = document.createElement('div')
    lineElement.classList.add('line')
    let textElement = document.createElement('span')
    textElement.textContent = text
    textElement.classList.add('text')
    lineElement.appendChild(textElement)
    this.element.appendChild(lineElement)
    this.element.scrollTop = this.element.scrollHeight
  }
  init () {
    this.writeLine('Target has loaded the page.')
    this.writeLine(`Target platform: ${this.userPlatform}`)
    this.writeLine(`Target User-Agent: ${this.userAgent}`)
//    this.writeLine(`Target browser plugins:\n${this.userPlugins}`)
    this.writeLocalIp()
  }
}

// On page load
(global => {
  // Set terminal last-login
  document.querySelector('.term-ts').textContent = new Date().toUTCString()
  // Create terminal handler
  const terminalHandler = new TerminalHandler()
  // Init terminal
  terminalHandler.init()
})(window)
