'use strict';

(function() {
    const template = document.createElement('template');
    template.innerHTML = `
  <style>
  .container {
		background: grey;
		width: 250px;
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-gap: 6px;
		margin-bottom: 5px;
        border-radius: 3px;
        padding: 6px;
	}

	.img > img {
		width: 100%;
        border-radius: 3px;
    }

    .img {
        text-align:center;
        margin: auto auto;
    }

    .bookmark {
        display:grid;
        grid-gap: 2px;
    }

    .bookmark > div {
        background-color:green; /* for visibility*/
    }

    .title {
        padding : 5px;
        font-size:12px;
        height: 30px;
        text-align: center;
        line-height:12px;
        overflow: hidden;
        white-space: nowrap;
    }

    .notes {
        height: 30px;
        font-size:12px;
        text-align:center;
        line-height:12px;
        overflow: hidden;
        white-space: nowrap;
    }

  </style>

  <div class="container">

    <div class="img">
        <img/>
    </div>

    <div class="bookmark">
        <div class="title">
            <h3 id="bookmarkTitle"></h3>
        </div>
        <div class="notes">
            <p><slot name="notes" /></p>
        </div>
    </div>

  </div>
`;

    class UserCard extends HTMLElement {
        set title(val) {
            this.setAttribute('title', val);
            this.shadowRoot.querySelector('h3').innerText = val;
        }

        set avatar(val) {
            this.setAttribute('avatar', val);
            this.shadowRoot.querySelector('img').src = val;
        }

        constructor() {
            super();
            // this custom web-element is encapsulated under shadow dom,
            // i.e. global css and sselectors won't work on |UserCard| elements.
            this.attachShadow({
                mode: 'open'
            });
            // Use the above declared template to make new custom elemennts.
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            // < user-card title="..." >
            // Extracts the content passed into |title| of our custom-element
            // and pastes it under the <h3> of our custom-element.
            this.shadowRoot.querySelector('h3').innerText = this.getAttribute('title');
            this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

            // P.S Note that values under <slots> of our custom-element are
            // directly passed from html.
        }
    }

    // Define the custom element for use.
    window.customElements.define('user-card', UserCard);
})();
