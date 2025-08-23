const {Pinecone} = require('@pinecone-database/pinecone')

const pc = new Pinecone({apiKey:process.env.PINECODE_API_KEY})

const chatgptIndex = pc.Index('practice-gpt');

async function createMemory({vectors, metadata, messageId}) {
    await chatgptIndex.upsert([{
        id:messageId,
        values:vectors,
        metadata
    }])
}

async function queryMemory({queryVectors, limit=5,metadata}) {
    const data = await chatgptIndex.query({
        vector:queryVectors,
        topK:limit,
        filter:metadata || undefined,
        includeMetadata:true
    })

    return data.matches
}

module.exports = {createMemory, queryMemory}
