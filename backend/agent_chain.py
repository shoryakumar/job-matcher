import os
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain.agents.agent_types import AgentType
from langchain.prompts import PromptTemplate

def create_agent_chain():
    llm = ChatOpenAI(temperature=0.7, openai_api_key=os.getenv("OPENAI_API_KEY"))

    tools = [
        Tool.from_function(
            func=lambda text: text,
            name="Identity",
            description="Simply returns the given text"
        )
    ]

    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )
    return agent