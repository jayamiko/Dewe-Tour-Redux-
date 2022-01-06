// Import React
import React from "react";
import "./boxChat.scss";

const BoxChat = () => {
  return (
    <div className="chatApp">
      <div className="usersChatList">
        <div className="card">
          <a onClick={""}>
            <div className="card-header">
              <p className="card-header-title">
                <span className="tag is-primary">2</span>&nbsp; Chats Ativos
              </p>
            </div>
          </a>
          <div id="userListBox" className="card-content thumb-user-list">
            <article className="media">
              <figure className="media-left">
                <p className="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/32x32.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>Barbara Middleton</strong>
                    <br />
                  </p>
                </div>
              </div>
            </article>
            <article className="media">
              <figure className="media-left">
                <p className="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/32x32.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>Jonathan Cales</strong>
                    <br />
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="chatBox" id="chatBox">
        <div className="card">
          <header className="card-header header-title">
            <p className="card-header-title">
              <i className="fa fa-circle is-online"></i>
              <img
                src="https://k0.okccdn.com/php/load_okc_image.php/images/32x0/971x939/0/10846088441021659030.webp?v=2"
                style={{
                  width: "30px",
                }}
                alt=""
              />
              {/* &nbsp;{{"headUser"}} */}
            </p>
            <a className="card-header-icon" href="/">
              <span className="icon">
                <i className="fa fa-close"></i>
              </span>
            </a>
          </header>

          <div id="chatbox-area">
            <div className="card-content chat-content">
              <div className="content">
                <div className="chat-message-group">
                  <div className="chat-thumb">
                    <figure className="image is-32x32">
                      <img
                        src="https://k0.okccdn.com/php/load_okc_image.php/images/32x0/971x939/0/10846088441021659030.webp?v=2"
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="chat-messages">
                    <div className="message">Olá meu nome é Camila</div>
                    <div className="from">Hoje 04:55</div>
                  </div>
                </div>
                <div className="chat-message-group writer-user">
                  <div className="chat-messages">
                    <div className="message">Olá meu nome é Marinho</div>
                    <div className="from">Hoje 04:55</div>
                  </div>
                </div>
                <div className="chat-message-group">
                  <div className="chat-thumb">
                    <figure className="image is-32x32">
                      <img src="https://k0.okccdn.com/php/load_okc_image.php/images/32x0/971x939/0/10846088441021659030.webp?v=2" />
                    </figure>
                  </div>
                  <div className="chat-messages">
                    <div className="message">Olá meu nome é Marinho</div>
                    <div className="message">Caro marinho</div>
                    <div className="from">Hoje 04:55</div>
                  </div>
                </div>
                <div className="chat-message-group">
                  <div className="typing">Typing</div>
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="card-footer" id="chatBox-textbox">
              <div style={{width: "63%"}}>
                <textarea
                  id="chatTextarea"
                  className="chat-textarea"
                  placeholder="Digite aqui"
                ></textarea>
              </div>
              <div className="has-text-centered" style={{width: "37%"}}>
                <a className="button is-white">
                  <i className="fa fa-smile-o fa-5" aria-hidden="true"></i>
                </a>
                <a className="button is-white">send</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div className="emojiBox" style={{display: "none"}}>
        <div className="box"></div>
      </div>
    </div>
  );
};

export default BoxChat;
