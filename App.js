import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	Button, 
	ScrollView, 
	TouchableOpacity, 
	Modal, 
	StyleSheet, 
} from "react-native"; 

const App = () => { 
	//Initialize variables with states
	const [notes, setNotes] = useState([]); 
	const [selectedNote, setSelectedNote] = useState(null); 
	const [title, setTitle] = useState(""); 
	const [content, setContent] = useState(""); 
	const [modalVisible, setModalVisible] = useState(false); 
 
  //Custom function used to save notes
	const handleSaveNote = () => { 
    //If the note already exist rewrite the data
		if (selectedNote) { 
			const updatedNotes = notes.map((note) => 
				note.id === selectedNote.id 
					? { ...note, title, content } 
					: note 
			); 

			setNotes(updatedNotes); 
			setSelectedNote(null); 
      setTitle(""); 
      setContent(""); 
      setModalVisible(false); 
		} else { 
      //If the input boxes are not empty
      if(title.trim().length !==0 && content.trim().length !==0){
        const newNote = { 
          id: Date.now(), 
          title, 
          content, 
        }; 

        setNotes([...notes, newNote]); 
        setTitle(""); 
        setContent(""); 
        setModalVisible(false); 
      } else {
        alert("Please enter title and/or content")
      }
		} 
	}; 

  //Custom function used to edit notes
	const handleEditNote = (note) => { 
		setSelectedNote(note); 
		setTitle(note.title); 
		setContent(note.content); 
		setModalVisible(true); 
	}; 

  //Custom function used to delete notes
	const handleDeleteNote = (note) => { 
		const updatedNotes = notes.filter( 
			(item) => item.id !== note.id 
		); 
		setNotes(updatedNotes); 
		setSelectedNote(null); 
		setModalVisible(false); 
	}; 

	return ( 
		<View style={styles.container}> 
			<Text style={styles.title}>NoteMe</Text> 
			<ScrollView style={styles.noteList}> 
				{notes.map((note) => ( 
          <View style={styles.noteContainer}>
            <TouchableOpacity 
              key={note.id} 
              onPress={() => handleEditNote(note)} 
            >
              <Text style={styles.noteTitle}> 
                {note.title}
              </Text> 
              <Text style={styles.noteContent}> 
                {note.content}
              </Text> 
            </TouchableOpacity> 
          </View>
				))} 
			</ScrollView> 

			{/* Add Note button */} 
			<TouchableOpacity 
				style={styles.addButton} 
				onPress={() => { 
					setTitle(""); 
					setContent(""); 
					setModalVisible(true); 
				}} 
			> 
				<Text style={styles.addButtonText}> 
					Add Note 
				</Text> 
			</TouchableOpacity> 

			<Modal
        style= {{ margin: 0 }} 
				visible={modalVisible} 
				transparent={false} 
			> 
				<View style={styles.modalContainer}> 
					<TextInput 
						style={styles.input} 
						placeholder="Enter note title"
						value={title} 
						onChangeText={setTitle} 
					/> 

					<TextInput 
						style={styles.contentInput} 
						multiline 
						placeholder="Enter note content"
						value={content} 
						onChangeText={setContent} 
					/> 

					<View style={styles.buttonContainer}> 
						<Button 
							title="Save"
							onPress={handleSaveNote} 
							color="#007BFF"
						/> 
						<Button 
							title="Cancel"
							onPress={() => 
								setModalVisible(false) 
							} 
							color="#FF3B30"
						/> 
						{selectedNote && ( 
							<Button 
								title="Delete"
								onPress={() => 
									handleDeleteNote( 
										selectedNote 
									) 
								} 
								color="#FF9500"
							/> 
						)} 
					</View> 
				</View> 
			</Modal> 
		</View> 
	); 
}; 

//App component styling 
const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		backgroundColor: "#e6e6e6", 
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "#333", 
	}, 
	noteList: { 
		flex: 1, 
	}, 
  noteContainer: {
		marginBottom: 10, 
		fontWeight: "bold", 
		color: "black", 
		backgroundColor: "white", 
		height: "auto", 
		width: "100%", 
		padding: 10, 
		borderRadius: 8, 
  },
	noteTitle: { 
		fontSize: 30,
    fontWeight: '400', 
	}, 
  noteContent: { 
		fontSize: 15, 
	}, 
	addButton: { 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#007BFF", 
		paddingVertical: 12, 
		borderRadius: 5, 
		marginTop: 10, 
	}, 
	addButtonText: { 
		color: "white", 
		fontSize: 16, 
		fontWeight: "bold", 
	}, 
	modalContainer: { 
		flex: 1, 
		padding: 50,
    height: "auto", 
		backgroundColor: "white",
	}, 
	input: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 5, 
	}, 
	contentInput: { 
		borderWidth: 1, 
		borderColor: "#E0E0E0", 
		padding: 10, 
		marginBottom: 20, 
		borderRadius: 5, 
		height: 150, 
		textAlignVertical: "top", 
	}, 
	buttonContainer: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
	}, 
}); 

export default App;
