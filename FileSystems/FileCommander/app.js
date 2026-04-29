const fs = require('fs/promises');

//open the file descriptor
//read or write from or in the file
//

(async () => {
    const CREATE_FILE = "create a file"
    const DELETE_FILE = "delete a file"
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to the file"


    const createFile = async (path, buffer) => {
        try {

            //we want to check whether or not we already have that file
            const exsistingFileHandle = await fs.open(path, 'r')
            exsistingFileHandle.close()

            //we already have that file
            return console.log(`The file ${path} already exists`)
        } catch (error) {
            //we dont have the file now we should create it
            const newFileHandle = await fs.open(path, "w")
            console.log("A new file was successfully created.")
            newFileHandle.close()
        }
    }

    const deleteFile = async (path) => {
        try {
            await fs.unlink(path);
            console.log(`successfully deleted ${path}`);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.error('there was an error:', error.message);
            } else {
                console.log("An error occurred while removing the file:")
                console.log(error)
            }
        }
    }

    const renameFile = async (oldPath, newPath) => {
        try {
            await fs.rename(oldPath, newPath)
            console.log("The file is successfully renamed.")
        } catch (error) {
            if (error.code = "ENOENT") {
                console.log("No file at this path to remove or the destination does not exists")
            } else {
                console.error('there was an error:', error.message);
            }
        }
    }

    let addedContent;

    const addToFile = async (path, content) => {
        if (addedContent === content) return
        try {
            const fileHandle = await fs.open(path, 'a')
            fileHandle.write(content)
            addedContent = content
            console.log("Content was added successfully!")
        } catch (error) {
            console.log("An error occurred while removing the file:")
            console.log(error)
        }

    }


    const commandFileHandler = await fs.open("./commandFile.txt", 'r')

    commandFileHandler.on("change", async () => {
        //get the size of our file
        const size = (await commandFileHandler.stat()).size
        // the location at which we want to start filling our buffer
        const offset = 0;
        //allocate the buffer with the size of the file
        const buff = Buffer.alloc(size)
        //how many bytes we want to read
        const length = buff.byteLength
        //the position that we want to start reading the file from
        const position = 0
        //we always want to read the whole content (from beginning all the way to the end)
        await commandFileHandler.read(buff, offset, length, position)
        const command = buff.toString('utf-8')
        //create a file
        //create a file <path>
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1)
            createFile(filePath, buff)
        }
        //delete a file
        //delete the file<path>
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1)
            deleteFile(filePath)
        }
        //rename file:
        //rename the file <path> tp <new-path>
        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ")
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
            const newFilePath = command.substring(_idx + 4)
            renameFile(oldFilePath, newFilePath)
        }
        // add to file:
        // add to the file <path> this content:
        if (command.includes(ADD_TO_FILE)) {
            const _idx = command.indexOf(" this content: ")
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
            const content = command.substring(_idx + 15)
            addToFile(filePath, content)
        }

    })

    const watcher = fs.watch("./commandFile.txt")

    for await (const event of watcher) {
        if (event.eventType === "change" && event.filename === "commandFile.txt") {
            commandFileHandler.emit("change")
        }
    }
    // fs.watch('./', (eventType, filename) => {
    //     console.log(`event type is: ${eventType}`);
    // })

    //decoder 0's and 1's to something meaningful
    //encoder changes something to 0's and 1's
})()
