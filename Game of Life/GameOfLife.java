package saga;

import java.util.*;

public class GameOfLife {
	public static void main(String[] args) {
		String[] cell = null;
		List<String> list = new ArrayList<String>();
		Scanner input = new Scanner(System.in);
		System.out
				.println("Note: Size is the number of rows and all rows must be input in one line");
		System.out.println("Enter String");
		for (int i = 0; i < Integer.parseInt(args[0]); i++) {
			list.add(input.nextLine());
		}
		cell = list.toArray(new String[list.size()]);
		int gen = 2;
		for (int i = 1; i < gen; i++) {
			System.out.println("Generation " + i + ":");
			cell = life(cell);
			printcell(cell);
		}
		input.close();
	}

	public static String[] life(String[] cell) {
		String[] newGen = new String[cell.length];
		for (int row = 0; row < cell.length; row++) {                            // For each row in the string
			newGen[row] = "";
			for (int i = 0; i < cell[row].length(); i++) {                       // For each character in the row
															
				String above = "";                                               // Neighbours in the row above the character
				String same = "";                                                // Neighbours in the same row as the character
				String below = "";
				if (i == 0) {                                                    // Check on the far left
					above = (row == 0) ? null : cell[row - 1].substring(i,       // Check if top row else grab neighbours above
							i + 2);
					same = cell[row].substring(i + 1, i + 2);                    // Grab neighbours on the same row
					below = (row == cell.length - 1) ? null : cell[row + 1]      // Check if bottom row else grab neighbours below
							.substring(i, i + 2);
				} else if (i == cell[row].length() - 1) {                        // Check on the far right 
					above = (row == 0) ? null : cell[row - 1].substring(i - 1,  
							i + 1);                                              // Check if top row else grab neighbours above
					same = cell[row].substring(i - 1, i);                        // Grab neighbours on the same row
					below = (row == cell.length - 1) ? null : cell[row + 1]   
							.substring(i - 1, i + 1);                            // Check if bottom row else grab neighbours below
				} else {                                                         // All other places
					above = (row == 0) ? null : cell[row - 1].substring(i - 1,
							i + 2);                                              // Check if top row else grab neighbours above
					same = cell[row].substring(i - 1, i)         
							+ cell[row].substring(i + 1, i + 2);                 // Grab neighbours on the same row
					below = (row == cell.length - 1) ? null : cell[row + 1]
							.substring(i - 1, i + 2);                            // Check if bottom row else grab neighbours below
				}
				int neighbors = getNeighbors(above, same, below);
				if (neighbors < 2 || neighbors > 3) {
					newGen[row] += "O";                                          // Cell dies if neighbours is less than 2 or greater than 3
				} else if (neighbors == 3) {
					newGen[row] += "X";                                          // Cell comes to life if there are 3 neighbours
				} else {
					newGen[row] += cell[row].charAt(i);                          // If there are 2 neighbours the cell stays the same
				}
			}
		}
		return newGen;
	}

	public static int getNeighbors(String above, String same, String below) {
		int count = 0;
		if (above != null) {                                    
			for (char x : above.toCharArray()) {                                 // For each neighbour above
				if (x == 'X')
					count++;                                                     //  Count if the neighbour above is alive
			}
		}
		for (char x : same.toCharArray()) {                                     // For each neighbour on the side
			if (x == 'X')
				count++;                                                        // Count if the neighbours on the side are alive
		}
		if (below != null) {
			for (char x : below.toCharArray()) {                               // For each neighbour below
				if (x == 'X')
					count++;                                                   //  Count if the neighbours below are alive
			}
		}
		return count;
	}

	public static void printcell(String[] cell) {
		for (String s : cell) {
			System.out.println(s);
		}
	}
}