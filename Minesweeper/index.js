

class Matrix {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.matrix = this.createMatrix(this.row, this.col)
    }
    createMatrix(row, col) {
        let matrix = [];
        for (let i = 0; i < row; i++) {
            matrix.push([]);
            for (let j = 0; j < col; j++) {
                matrix[i].push({
                    id: String(i) + String(j),
                    isBomb: false,
                    flaged: false,
                    display: '⬜'
                });
            }
        }
        return matrix;
    }

    fill(odds) {

        this.matrix.forEach(a => {
            a.forEach(a2 => {
                if (Math.floor(Math.random() * 100) < odds * 100) {
                    a2.isBomb = true;
                }
            })
        })
    }
    calc() {
        let counter = 0;
        for (let i = 0; i < this.row; i++) {

            for (let j = 0; j < this.col; j++) {
                counter = 0;


                for (let I = i - 1; I < i + 2; I++) {
                    if (-1 < I && I < this.row) {

                        for (let J = j - 1; J < j + 2; J++) {
                            if (-1 < J && J < this.col) {

                                if (J == j && I == i) continue

                                this.matrix[I][J] && this.matrix[I][J].isBomb == true && counter++
                            }
                        }

                    }
                }

                this.matrix[i][j].count = counter;
            }
        }
    }


    log() {
        let m = JSON.parse(JSON.stringify(this.matrix))
        let r = m.map(i => {
            return i.map(j => {
                return JSON.stringify(j)
            })
        })
        console.table(r)
    }
}


function main() {
    let m = new Matrix(6, 6)
    m.fill(0.1);
    m.calc();

    return {
        matrix: m.matrix,
        bombsCount: m.matrix.flat().filter(i => i.isBomb == true).length,
        stack: [],
        setFlag(id) {

            let ref = this.matrix.flat().find(i => i.id == id);

            ref.flaged = !ref.flaged;

            ref.display = ref.flaged ? '🚩' : '⬜';

        },

        clr(id) {
            // debugger
            let i = Number(id[0])
            let j = Number(id[1])

            if (this.matrix[i][j].isBomb == true) {
                alert('game over');
                window.location.reload()
                return 0;

            }
            this.matrix[i][j].display = this.matrix[i][j].count != '0' ? this.matrix[i][j].count : ' ';

            if (this.matrix[i][j].count != 0 || this.stack.includes(id)) {
                return 1
            }
            for (let a = i - 1; a < i + 2; a++) {
                if (-1 < a && a < this.matrix.length) {

                    for (let b = j - 1; b < j + 2; b++) {
                        if (-1 < b && b < this.matrix[j].length) {

                            let currentId = this.matrix[a][b].id

                            if (b == j && a == i) {
                                this.stack.push(currentId)
                                continue
                            }

                            this.clr(currentId)

                        }
                    }
                }
            }

        }
    };
}

document.querySelector('#main').addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    const id = ev.target.id.replace('cell', '')
    document.querySelector('#main').__x.$data.setFlag(id)

}, false);