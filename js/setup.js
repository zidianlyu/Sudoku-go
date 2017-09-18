function Game(container) {
    this.container = container;
    this.tiles = new Array(81);
}

Game.prototype = {
    newTile: function(val, idx) {
        let tile = document.createElement('div');
        this.setTileVal(tile, val, idx);
        return tile;
    },

    setTileVal: function(tile, val, idx) {
        if(val === '.'){
            tile.className = `tile tile-empty tile-${idx}`;
        }
        else{
            tile.className = `tile tile-${idx} tile${val}`;
        }
        tile.setAttribute('val', val);
        tile.setAttribute('id', `tile-${idx}`);
        tile.innerHTML = val > '0'? val: '';
    },

    init: function() {
        for (let i = 0; i < playBoardStr.length; i++) {
            let tile = this.newTile(playBoardStr[i], i);
            tile.setAttribute('index', i);
            this.container.appendChild(tile);
            this.tiles[i] = tile;
        }
    }
}
