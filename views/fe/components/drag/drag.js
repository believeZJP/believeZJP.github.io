/****
 * 学习来源：
 	https://github.com/hernansartorio/jquery-nice-select
 	@author: believezjp
*/
(function () {
    function Main() {
        this._containerB = document.getElementById("b");
        this._p = document.getElementById("p");

        this._p.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("element-id", this._p.id);
        }.bind(this));

        this._containerB.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        this._containerB.addEventListener("drop", function (event) {
            var id = event.dataTransfer.getData("element-id");

            if (id) {
                this._containerB.appendChild(document.getElementById(id));
            }
        }.bind(this));
    }

    new Main();
})();
