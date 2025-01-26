"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const dotenv_1 = __importDefault(require("dotenv"));
const github_1 = require("./github");
dotenv_1.default.config();
const TOPIC_NAME = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const consumer =  kafka.consumer({groupId:'main-worker'});
        // await consumer.connect();
        // await consumer.subscribe({topic:TOPIC_NAME, fromBeginning:true});
        // await consumer.run({
        //     eachMessage: async ({topic,partition,message})=>{
        //         console.log({
        //             partition,
        //             offset: message.offset,
        //             value:message.value?.toString(),
        //         })
        //         await new Promise(r => setTimeout(r,1000 ))
        //         await consumer.commitOffsets([{
        //             topic:TOPIC_NAME,
        //             partition:partition,
        //             offset: message.offset + 1
        //         }])
        //     }
        // })
        (0, github_1.getAllCommitMessages)("sarfaraz-1786", "Zapier-Clone", "master")
            .then(commitMessages => {
            console.log('Conclusion:', commitMessages);
        })
            .catch(error => {
            console.error('Error:', error);
        });
    });
}
main();
