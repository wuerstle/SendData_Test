namespace SendData {
    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        setupColorDivs();
    }

    function setupColorDivs(): void {
        let colors: string[] = ["red", "green", "blue"];
        let divs: NodeListOf<HTMLDivElement> = document.getElementsByTagName("div");
        for (let i: number = 0; i < divs.length; i++) {
            divs[i].style.backgroundColor = colors[i];
            divs[i].addEventListener("click", handleClickOnDiv);
        }
    }

    function handleClickOnDiv(_event: Event): void {
        let style: CSSStyleDeclaration = (<HTMLElement>_event.target).style;
        console.log(style.backgroundColor);
        sendRequest(style.backgroundColor);
    }

    function sendRequest(_color: string): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", "https://eia2-test.herokuapp.com/?color" + _color, true);
        //xhr.open("GET", "https://eia2-servertest.herokuapp.com?color=" + _color, true);
        xhr.addEventListener("readystatechange", handleStateChange);
        xhr.send();
    }

    function handleStateChange(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            alert(xhr.response);
        }
    }
}