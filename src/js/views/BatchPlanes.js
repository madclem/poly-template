// import Mesh from '../geometry/Mesh';
// import Program from '../Program';
// import State from '../State';
import vert from '../shaders/planes-dot.vert';
import frag from '../shaders/simpleColor.frag';

export default class BatchPlanes
{
    constructor(size = 25)
    {

        this.program = new POLY.Program(vert, frag, {
            color: {
                type: 'vec3',
                value: [1., 1., 1.]
            },
            opacity: {
                type: 'float',
                value: .6
            }
        });
        let state = new POLY.State(this.program);
        state.depthTest = false;


        this.geom = new POLY.geometry.Mesh(this.program);

        let index = 0;
        let positions = [];
        let indices = [];

        for (let i = -size; i < size; i++)
        {
            for (let j = -size; j < size; j++)
            {
                positions.push(i, j, 0);
                indices.push(index);
                index++;

                positions.push(i, 0, j);
                indices.push(index);
                index++;
            }
        }

        this.geom.addPosition(new Float32Array(positions));
        this.geom.addIndices(indices);
    }

    render()
    {

        this.program.bind();
        POLY.GL.draw(this.geom);
    }

    draw()
    {
    }
}
