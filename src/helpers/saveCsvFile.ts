import * as FileSystem from 'expo-file-system';

export const saveCsvFile = async (csvContent: string, title: string) => {

    try {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if(permissions.granted){
            const date = new Date()
            const path = `${permissions.directoryUri}`
            await FileSystem.StorageAccessFramework.createFileAsync(path, `${title}-${date.toISOString()}.csv`, "text/csv").then(async(fileUri) => {
                await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
            })
            alert("Arquivo salvo com sucesso")
        } else {
            alert("You must allow permission to save.")
        }
    } catch (error) {
      console.error(error);
    }
}