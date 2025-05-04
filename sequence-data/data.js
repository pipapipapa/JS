export class Data{
    constructor(){
        this.data = this.createData();
    }

    createData(){
        const data = [
            {
                id: "A076263",
                name: "Triangle read by rows: T(n,k) = number of nonisomorphic connected graphs with n vertices and k edges",
                terms: [1, 1, 1, 1, 2, 1, 1, 3, 5, 5, 4, 2, 1, 1, 6, 13, 19, 22, 20, 14, 9, 5, 2, 1, 1, 11, 33, 67, 107, 132, 138, 126, 95, 64, 40, 21, 10, 5, 2, 1],
                keywords: ["nonn", "tabf", "graph", "connected", "triangle", "nodes", "edges", "sendo", "segde"],
                author: "Arne Ring"
            },
            {
                id: "A000040",
                name: "The prime numbers.",
                terms: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
                keywords: ["core", "nonn", "easy", "nice", "prime", "ecin"],
                author: "N. J. A. Sloane"
            },
            {
                id: "A000045",
                name: "Fibonacci numbers: F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.",
                terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597],
                keywords: ["core", "nonn", "easy", "nice", "fibonacci"],
                author: "N. J. A. Sloane"
            }
        ];
        return data
    }
    getData(){
        return this.data
    }    
}