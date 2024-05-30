import { Sorted, sortSlice } from "../redux/sortSlice";

describe('sortSlice.reducer', function() {
    it('should change desc if the same column was clicked', () => {
      const a = "term";

      const state: Sorted = {
          key: a,
          desc: -1
      };
      const action = sortSlice.actions.setSort(a);

      const actualResult = sortSlice.reducer(state, action);
      const expectedResult = {
        key: a,
        desc: 1
      };

      expect(actualResult).toEqual(expectedResult);
    })
    it('should change key and keep desk -1 if different column was clicked and desc was -1', () => {
        const a = "term";
        const b = "max";

        const state: Sorted = {
            key: a,
            desc: -1
        };

        const action = sortSlice.actions.setSort(b);

        const actualResult = sortSlice.reducer(state, action);
        const expectedResult = {
            key: b,
            desc: -1
        }
        expect(actualResult).toEqual(expectedResult);
    })
    it('should change key and set desk 1 if different column was clicked and desc was -1', () => {
        const a = "term";
        const b = "max";

        const state: Sorted = {
            key: a,
            desc: 1
        };

        const action = sortSlice.actions.setSort(b);

        const actualResult = sortSlice.reducer(state, action);
        const expectedResult = {
            key: b,
            desc: -1
        };
        expect(actualResult).toEqual(expectedResult);
    })
})